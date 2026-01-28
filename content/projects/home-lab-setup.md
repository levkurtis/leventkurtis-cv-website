---
title: Home Lab Setup
description: Setting up a home lab with Raspberry Pi for self-hosting, automation, and learning infrastructure management.
status: Done
date: 2025-12-15
tags:
  - Infrastructure
  - Self-hosting
  - Raspberry Pi
---

# Home Lab Setup

A documentation of my home lab journey - from a single Raspberry Pi to a functional self-hosted environment.

## Goals

When I started this project, I wanted to:

1. **Learn** - Understand networking, Linux administration, and infrastructure
2. **Self-host** - Run my own services instead of relying on cloud providers
3. **Automate** - Make my home smarter and more efficient

## Hardware

### Current Setup

- **Raspberry Pi 4 (8GB)** - Main server
- **External SSD** - Storage for data
- **UPS** - Power backup

## Software Stack

### Operating System

Running Ubuntu Server 22.04 LTS for stability and long-term support.

### Services

| Service | Purpose |
|---------|---------|
| Pi-hole | Network-wide ad blocking |
| Home Assistant | Home automation |
| Nginx Proxy Manager | Reverse proxy |
| Portainer | Docker management |
| Uptime Kuma | Service monitoring |

### Docker

Everything runs in Docker containers for easy management and updates.

```yaml
# Example docker-compose snippet
services:
  pihole:
    image: pihole/pihole:latest
    restart: unless-stopped
    ports:
      - "53:53/tcp"
      - "53:53/udp"
```

## Results

After completing this project:

- **Ad blocking**: 40% of DNS queries blocked
- **Automation**: Lights, thermostat, and security integrated
- **Learning**: Gained practical DevOps experience

## What I Learned

1. **Networking basics** - DNS, DHCP, VLANs, firewalls
2. **Docker** - Containerization and orchestration
3. **Linux administration** - CLI, systemd, cron, permissions
4. **Infrastructure as Code** - Managing config in git

## Future Ideas

- Add a second Pi for redundancy
- Set up a proper backup system
- Experiment with Kubernetes (k3s)

## Conclusion

This project was incredibly rewarding. The hands-on experience with infrastructure management has been valuable both personally and professionally.
