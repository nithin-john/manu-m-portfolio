#!/usr/bin/env python3
"""
High-Performance Local Server for 'From Human to Hidden AI Identity' Portfolio
"""
import http.server
import socketserver
import sys
import webbrowser

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080

class PortfolioHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and caching headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

def run():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), PortfolioHandler) as httpd:
        print(f"==================================================")
        print(f"  HUMAN TO HIDDEN AI IDENTITY PORTFOLIO SERVER")
        print(f"  Target: Manu MA — Automobile Engineer & QA/QC")
        print(f"  Running at: http://localhost:{PORT}")
        print(f"  Press Ctrl+C to stop.")
        print(f"==================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")

if __name__ == "__main__":
    run()
