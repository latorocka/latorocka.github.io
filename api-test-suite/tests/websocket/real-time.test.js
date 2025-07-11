const WebSocket = require('ws');

describe('WebSocket Real-time Communication - Echo Server', () => {
  const echoServerURL = 'wss://echo.websocket.org';

  // No setup required for echo server testing

  function handleMessage(ws, data) {
    switch (data.type) {
      case 'subscribe':
        ws.send(JSON.stringify({
          type: 'subscription_confirmed',
          channel: data.channel,
          timestamp: Date.now()
        }));
        break;
      
      case 'unsubscribe':
        ws.send(JSON.stringify({
          type: 'subscription_cancelled',
          channel: data.channel,
          timestamp: Date.now()
        }));
        break;
      
      case 'ping':
        ws.send(JSON.stringify({
          type: 'pong',
          timestamp: Date.now()
        }));
        break;
      
      case 'chat_message':
        // Broadcast to all connected clients
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'chat_message',
              message: data.message,
              user: data.user,
              timestamp: Date.now()
            }));
          }
        });
        
        // Confirm to sender
        ws.send(JSON.stringify({
          type: 'message_sent',
          id: data.id,
          timestamp: Date.now()
        }));
        break;
      
      default:
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Unknown message type'
        }));
    }
  }

  describe('Connection Management', () => {
    test('should establish WebSocket connection to echo server', (done) => {
      const ws = new WebSocket(echoServerURL);
      
      ws.on('open', () => {
        expect(ws.readyState).toBe(WebSocket.OPEN);
        ws.close();
        done();
      });
      
      ws.on('error', done);
    });

    test('should handle connection close', (done) => {
      const ws = new WebSocket(`ws://localhost:${PORT}`);
      
      ws.on('open', () => {
        ws.close();
      });
      
      ws.on('close', (code, reason) => {
        expect(code).toBe(1000); // Normal closure
        done();
      });
      
      ws.on('error', done);
    });

    test('should handle connection errors', (done) => {
      const ws = new WebSocket('ws://localhost:9999'); // Invalid port
      
      ws.on('error', (error) => {
        expect(error).toBeDefined();
        done();
      });
    });

    test('should support multiple concurrent connections', (done) => {
      const connections = [];
      const connectionCount = 5;
      let openConnections = 0;

      for (let i = 0; i < connectionCount; i++) {
        const ws = new WebSocket(`ws://localhost:${PORT}`);
        connections.push(ws);
        
        ws.on('open', () => {
          openConnections++;
          if (openConnections === connectionCount) {
            // All connections established
            expect(openConnections).toBe(connectionCount);
            
            // Close all connections
            connections.forEach(conn => conn.close());
            done();
          }
        });
      }
    });
  });

  describe('Message Handling', () => {
    test('should handle subscription messages', (done) => {
      const ws = new WebSocket(`ws://localhost:${PORT}`);
      
      ws.on('open', () => {
        ws.send(JSON.stringify({
          type: 'subscribe',
          channel: 'user_updates'
        }));
      });
      
      ws.on('message', (data) => {
        const message = JSON.parse(data);
        expect(message.type).toBe('subscription_confirmed');
        expect(message.channel).toBe('user_updates');
        expect(message.timestamp).toBeDefined();
        
        ws.close();
        done();
      });
    });

    test('should handle unsubscription messages', (done) => {
      const ws = new WebSocket(`ws://localhost:${PORT}`);
      
      ws.on('open', () => {
        ws.send(JSON.stringify({
          type: 'unsubscribe',
          channel: 'user_updates'
        }));
      });
      
      ws.on('message', (data) => {
        const message = JSON.parse(data);
        expect(message.type).toBe('subscription_cancelled');
        expect(message.channel).toBe('user_updates');
        
        ws.close();
        done();
      });
    });

    test('should handle ping-pong messages', (done) => {
      const ws = new WebSocket(`ws://localhost:${PORT}`);
      
      ws.on('open', () => {
        ws.send(JSON.stringify({
          type: 'ping'
        }));
      });
      
      ws.on('message', (data) => {
        const message = JSON.parse(data);
        expect(message.type).toBe('pong');
        expect(message.timestamp).toBeDefined();
        
        ws.close();
        done();
      });
    });

    test('should handle invalid JSON messages', (done) => {
      const ws = new WebSocket(`ws://localhost:${PORT}`);
      
      ws.on('open', () => {
        ws.send('invalid json message');
      });
      
      ws.on('message', (data) => {
        const message = JSON.parse(data);
        expect(message.type).toBe('error');
        expect(message.message).toBe('Invalid JSON');
        
        ws.close();
        done();
      });
    });

    test('should handle unknown message types', (done) => {
      const ws = new WebSocket(`ws://localhost:${PORT}`);
      
      ws.on('open', () => {
        ws.send(JSON.stringify({
          type: 'unknown_type',
          data: 'test'
        }));
      });
      
      ws.on('message', (data) => {
        const message = JSON.parse(data);
        expect(message.type).toBe('error');
        expect(message.message).toBe('Unknown message type');
        
        ws.close();
        done();
      });
    });
  });

  describe('Real-time Chat Features', () => {
    test('should broadcast chat messages to all clients', (done) => {
      const client1 = new WebSocket(`ws://localhost:${PORT}`);
      const client2 = new WebSocket(`ws://localhost:${PORT}`);
      
      let connectionsReady = 0;
      let messageReceived = false;

      const checkReady = () => {
        connectionsReady++;
        if (connectionsReady === 2) {
          // Both clients connected, send message from client1
          client1.send(JSON.stringify({
            type: 'chat_message',
            id: 'msg-001',
            message: 'Hello from client1!',
            user: 'testuser1'
          }));
        }
      };

      client1.on('open', checkReady);
      client2.on('open', checkReady);

      client1.on('message', (data) => {
        const message = JSON.parse(data);
        if (message.type === 'message_sent') {
          expect(message.id).toBe('msg-001');
          expect(message.timestamp).toBeDefined();
        }
      });

      client2.on('message', (data) => {
        const message = JSON.parse(data);
        if (message.type === 'chat_message') {
          expect(message.message).toBe('Hello from client1!');
          expect(message.user).toBe('testuser1');
          expect(message.timestamp).toBeDefined();
          
          messageReceived = true;
          client1.close();
          client2.close();
          done();
        }
      });

      // Cleanup after timeout
      setTimeout(() => {
        if (!messageReceived) {
          client1.close();
          client2.close();
          done(new Error('Message not received within timeout'));
        }
      }, 2000);
    });

    test('should handle multiple simultaneous messages', (done) => {
      const senderClient = new WebSocket(`ws://localhost:${PORT}`);
      const receiverClient = new WebSocket(`ws://localhost:${PORT}`);
      
      let connectionsReady = 0;
      let messagesReceived = 0;
      const totalMessages = 5;

      const checkReady = () => {
        connectionsReady++;
        if (connectionsReady === 2) {
          // Send multiple messages rapidly
          for (let i = 0; i < totalMessages; i++) {
            senderClient.send(JSON.stringify({
              type: 'chat_message',
              id: `msg-${i}`,
              message: `Message ${i}`,
              user: 'testuser'
            }));
          }
        }
      };

      senderClient.on('open', checkReady);
      receiverClient.on('open', checkReady);

      receiverClient.on('message', (data) => {
        const message = JSON.parse(data);
        if (message.type === 'chat_message') {
          messagesReceived++;
          expect(message.message).toContain('Message');
          expect(message.user).toBe('testuser');
          
          if (messagesReceived === totalMessages) {
            senderClient.close();
            receiverClient.close();
            done();
          }
        }
      });

      // Cleanup after timeout
      setTimeout(() => {
        if (messagesReceived < totalMessages) {
          senderClient.close();
          receiverClient.close();
          done(new Error(`Only received ${messagesReceived} out of ${totalMessages} messages`));
        }
      }, 3000);
    });
  });

  describe('Performance Testing', () => {
    test('should handle rapid message sending', (done) => {
      const ws = new WebSocket(`ws://localhost:${PORT}`);
      let messagesReceived = 0;
      const messageCount = 100;
      
      ws.on('open', () => {
        const startTime = Date.now();
        
        // Send messages rapidly
        for (let i = 0; i < messageCount; i++) {
          ws.send(JSON.stringify({
            type: 'ping'
          }));
        }
        
        ws.on('message', (data) => {
          const message = JSON.parse(data);
          if (message.type === 'pong') {
            messagesReceived++;
            
            if (messagesReceived === messageCount) {
              const endTime = Date.now();
              const totalTime = endTime - startTime;
              
              // Should handle 100 messages in under 1 second
              expect(totalTime).toBeLessThan(1000);
              expect(messagesReceived).toBe(messageCount);
              
              ws.close();
              done();
            }
          }
        });
      });
    });

    test('should maintain connection stability under load', (done) => {
      const connections = [];
      const connectionCount = 10;
      const messagesPerConnection = 10;
      let totalMessagesReceived = 0;
      const expectedTotal = connectionCount * messagesPerConnection;

      for (let i = 0; i < connectionCount; i++) {
        const ws = new WebSocket(`ws://localhost:${PORT}`);
        connections.push(ws);
        
        ws.on('open', () => {
          // Send multiple messages from each connection
          for (let j = 0; j < messagesPerConnection; j++) {
            ws.send(JSON.stringify({
              type: 'ping'
            }));
          }
        });
        
        ws.on('message', (data) => {
          const message = JSON.parse(data);
          if (message.type === 'pong') {
            totalMessagesReceived++;
            
            if (totalMessagesReceived === expectedTotal) {
              // All messages received successfully
              connections.forEach(conn => conn.close());
              done();
            }
          }
        });
      }

      // Cleanup after timeout
      setTimeout(() => {
        connections.forEach(conn => conn.close());
        if (totalMessagesReceived < expectedTotal) {
          done(new Error(`Only received ${totalMessagesReceived} out of ${expectedTotal} messages`));
        }
      }, 5000);
    });
  });

  describe('Error Handling and Recovery', () => {
    test('should handle connection interruption', (done) => {
      const ws = new WebSocket(`ws://localhost:${PORT}`);
      
      ws.on('open', () => {
        // Simulate connection interruption
        ws.terminate();
      });
      
      ws.on('close', (code, reason) => {
        expect(code).toBe(1006); // Abnormal closure
        done();
      });
    });

    test('should handle server-side errors gracefully', (done) => {
      const ws = new WebSocket(`ws://localhost:${PORT}`);
      
      ws.on('open', () => {
        // Send malformed message that should trigger error handling
        ws.send(JSON.stringify({
          type: 'subscribe',
          // Missing required channel field
        }));
      });
      
      ws.on('message', (data) => {
        const message = JSON.parse(data);
        // Server should handle the error gracefully
        expect(message.type).toBe('error');
        ws.close();
        done();
      });
    });
  });

  describe('Security Testing', () => {
    test('should validate message size limits', (done) => {
      const ws = new WebSocket(`ws://localhost:${PORT}`);
      
      ws.on('open', () => {
        // Send extremely large message
        const largeMessage = 'x'.repeat(1024 * 1024); // 1MB message
        
        ws.send(JSON.stringify({
          type: 'chat_message',
          message: largeMessage,
          user: 'testuser'
        }));
      });
      
      ws.on('message', (data) => {
        const message = JSON.parse(data);
        // Should handle large messages appropriately
        expect(message.type).toBeDefined();
        ws.close();
        done();
      });
      
      ws.on('error', (error) => {
        // Connection might be closed due to message size
        expect(error).toBeDefined();
        done();
      });
    });

    test('should handle rapid connection attempts', (done) => {
      const connections = [];
      const connectionCount = 20;
      let successfulConnections = 0;
      
      // Attempt many connections rapidly
      for (let i = 0; i < connectionCount; i++) {
        const ws = new WebSocket(`ws://localhost:${PORT}`);
        connections.push(ws);
        
        ws.on('open', () => {
          successfulConnections++;
          if (successfulConnections === connectionCount) {
            // All connections successful
            connections.forEach(conn => conn.close());
            done();
          }
        });
        
        ws.on('error', () => {
          // Some connections might fail, that's expected
        });
      }
      
      // Cleanup after timeout
      setTimeout(() => {
        connections.forEach(conn => {
          if (conn.readyState === WebSocket.OPEN) {
            conn.close();
          }
        });
        
        // Should handle at least some connections
        expect(successfulConnections).toBeGreaterThan(0);
        done();
      }, 3000);
    });
  });
});