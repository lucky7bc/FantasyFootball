# Fantasy Football Assistant (MERN + Sleeper API)

A web app that connects to your Sleeper fantasy football leagues to help you dominate your season with:

- Personal tier-based rankings
- Weekly lineup optimization (start/sit recommendations + boom/bust risk)
- Rest-of-Season (ROS) value charts
- League insights including opponent strength dashboards and playoff odds visualizations

---

## Features

### Draft & Roster Management
- Build custom tiered rankings for your league
- Drag-and-drop interface to reorder players
- Import baseline rankings to seed your tiers

### Weekly Lineup Optimization
- Start/Sit recommendations factoring in:
  - League scoring rules
  - Opponent matchups
  - Boom/Bust probability
- Thursday/MNF player lock awareness

### Rest-of-Season (ROS) Tools
- Value charts showing each player's projected value
- Trade analyzer that compares multi-player deals
- Buy-low / sell-high indicators

### League Insights
- Opponent strength heatmaps by position
- Playoff odds projections (Monte Carlo simulation)
- Remaining schedule difficulty

---

## Tech Stack

**Frontend**
- React (Vite) + TypeScript
- TailwindCSS + shadcn/ui
- React Query for server state
- Zustand or Redux Toolkit for local state

**Backend**
- Node.js + Express + TypeScript
- MongoDB Atlas + Mongoose
- Redis + BullMQ for background jobs
- JWT authentication

**Integrations**
- [Sleeper API](https://docs.sleeper.com/#introduction) (league, roster, and player data)
- Optional: weather/injury/news APIs
