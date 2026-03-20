# DR System Structure

## Overview
This system is designed to validate communication with KPX using OpenADR.

## Core Modules

### 1. Connection Management
- KPX endpoint configuration
- Authentication handling
- Connection test

### 2. Resource Management
- Resource ID / Customer ID mapping

### 3. Event Management
- Receive DR events
- View event details
- Send response (Ack / Participation)

### 4. Power Data Management
- Input power usage data
- Send data to KPX

### 5. Monitoring
- Communication logs
- Error logs

## Architecture
- Feature-based modular structure
- OpenADR communication adapter
- Mock data for testing