# social-media-dashboard
A basic social media analytics dashboard built using React, Node.js, Express.js, and PostgreSQL.
# Social Media Dashboard

A basic social media analytics dashboard built using React, Node.js, Express.js, and PostgreSQL.

## Features

* User Authentication
* User Profile
* Dashboard Analytics
* Data Visualization
* PostgreSQL Database

## Tech Stack

### Frontend

* React.js
* React Router
* CSS

### Backend

* Node.js
* Express.js
* PostgreSQL

## Installation

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API

- `POST /api/analytics` - Add aggregate dashboard metrics
- `POST /api/analytics/xquik` - Import Xquik export rows as dashboard metrics

### Xquik Import Example

```json
{
  "posts": [
    {
      "tweet_id": "1889000000000000001",
      "text": "Launch feedback is great today",
      "likeCount": 184,
      "retweetCount": 42,
      "replyCount": 17,
      "viewCount": 9210
    }
  ]
}
```

The importer accepts snake_case and camelCase metric names, then stores the
aggregated likes, comments, shares, and reach values in the analytics table.

## Author

Varad

## Future Improvements

* Instagram API Integration
* Twitter API Integration
* Content Scheduling
* Real-Time Analytics
