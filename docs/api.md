# API Documentation

This document provides comprehensive API documentation for the QR Code Generator application.

## 🔐 Authentication

All API endpoints require authentication via Clerk. The authentication is handled through middleware that validates the user session.

### Headers Required

```http
Authorization: Bearer <clerk-session-token>
Content-Type: application/json
```

## 📊 QR Code Endpoints

### Get All QR Codes

**Endpoint**: `GET /api/qr`

**Description**: Retrieve all QR codes for the authenticated user.

**Headers**:
```http
Authorization: Bearer <token>
```

**Response**:
```json
{
  "qrCodes": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "My Website QR",
      "type": "WEBSITE",
      "content": "https://example.com",
      "qrCodeData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
      "downloadCount": 5,
      "scanCount": 12,
      "createdAt": "2024-01-15T10:30:00Z",
      "settings": {
        "size": 256,
        "color": "#000000",
        "backgroundColor": "#ffffff",
        "errorCorrection": "M"
      }
    }
  ]
}
```

**Status Codes**:
- `200`: Success
- `401`: Unauthorized
- `500`: Internal server error

---

### Generate QR Code

**Endpoint**: `POST /api/qr/generate`

**Description**: Generate a new QR code without saving to database.

**Request Body**:
```json
{
  "content": "https://example.com",
  "settings": {
    "size": 256,
    "color": "#000000",
    "backgroundColor": "#ffffff",
    "errorCorrection": "M"
  }
}
```

**Response**:
```json
{
  "qrCodeDataURL": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

**Status Codes**:
- `200`: Success
- `400`: Bad request (invalid content or settings)
- `401`: Unauthorized
- `500`: Internal server error

**Error Response**:
```json
{
  "error": "Invalid QR code content",
  "message": "Content exceeds maximum length for selected error correction level"
}
```

---

### Save QR Code

**Endpoint**: `POST /api/qr/save`

**Description**: Save a generated QR code to the database.

**Request Body**:
```json
{
  "title": "My Website QR",
  "type": "WEBSITE",
  "content": "https://example.com",
  "qrCodeData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "settings": {
    "size": 256,
    "color": "#000000",
    "backgroundColor": "#ffffff",
    "errorCorrection": "M"
  }
}
```

**Response**:
```json
{
  "qrCode": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "My Website QR",
    "type": "WEBSITE",
    "content": "https://example.com",
    "downloadCount": 0,
    "scanCount": 0,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Status Codes**:
- `201`: Created successfully
- `400`: Bad request
- `401`: Unauthorized
- `500`: Internal server error

---

### Get Single QR Code

**Endpoint**: `GET /api/qr/[id]`

**Description**: Retrieve a specific QR code by ID.

**Parameters**:
- `id` (string): QR code ID

**Response**:
```json
{
  "id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "title": "My Website QR",
  "type": "WEBSITE",
  "content": "https://example.com",
  "qrCodeData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "downloadCount": 5,
  "scanCount": 12,
  "createdAt": "2024-01-15T10:30:00Z",
  "settings": {
    "size": 256,
    "color": "#000000",
    "backgroundColor": "#ffffff",
    "errorCorrection": "M"
  }
}
```

**Status Codes**:
- `200`: Success
- `404`: QR code not found
- `401`: Unauthorized
- `500`: Internal server error

---

### Update QR Code

**Endpoint**: `PUT /api/qr/[id]`

**Description**: Update an existing QR code.

**Parameters**:
- `id` (string): QR code ID

**Request Body**:
```json
{
  "title": "Updated Website QR",
  "content": "https://updated-example.com",
  "settings": {
    "size": 512,
    "color": "#0066cc",
    "backgroundColor": "#ffffff",
    "errorCorrection": "H"
  }
}
```

**Response**:
```json
{
  "qrCode": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "title": "Updated Website QR",
    "type": "WEBSITE",
    "content": "https://updated-example.com",
    "downloadCount": 5,
    "scanCount": 12,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:45:00Z"
  }
}
```

**Status Codes**:
- `200`: Success
- `400`: Bad request
- `404`: QR code not found
- `401`: Unauthorized
- `500`: Internal server error

---

### Delete QR Code

**Endpoint**: `DELETE /api/qr/[id]`

**Description**: Delete a QR code and all associated data.

**Parameters**:
- `id` (string): QR code ID

**Response**:
```json
{
  "message": "QR code deleted successfully",
  "deletedId": "64f8a1b2c3d4e5f6a7b8c9d0"
}
```

**Status Codes**:
- `200`: Success
- `404`: QR code not found
- `401`: Unauthorized
- `500`: Internal server error

---

### Track Download

**Endpoint**: `POST /api/qr/[id]/download`

**Description**: Track a download event for a QR code.

**Parameters**:
- `id` (string): QR code ID

**Request Body**:
```json
{
  "fileFormat": "PNG"
}
```

**Response**:
```json
{
  "message": "Download tracked successfully",
  "downloadCount": 6
}
```

**Status Codes**:
- `200`: Success
- `404`: QR code not found
- `401`: Unauthorized
- `500`: Internal server error

---

## 👤 User Statistics

### Get User Stats

**Endpoint**: `GET /api/user/stats`

**Description**: Get user statistics and analytics.

**Response**:
```json
{
  "totalQRCodes": 15,
  "totalDownloads": 42,
  "totalScans": 128,
  "thisMonth": 8
}
```

**Status Codes**:
- `200`: Success
- `401`: Unauthorized
- `500`: Internal server error

---

## 🔧 QR Code Settings

### Size Settings

**Range**: 64px - 1024px
**Default**: 256px
**Recommended**: 256px for web, 512px for print

### Color Settings

**QR Code Color**:
- Default: `#000000` (black)
- Custom: Any valid hex color
- Recommended: High contrast colors

**Background Color**:
- Default: `#ffffff` (white)
- Custom: Any valid hex color
- Recommended: Light colors for better scanning

### Error Correction Levels

| Level | Description | Data Capacity | Use Case |
|-------|-------------|---------------|----------|
| `L` | Low (~7%) | Highest | Simple content, clean environments |
| `M` | Medium (~15%) | High | General purpose (recommended) |
| `Q` | Quartile (~25%) | Medium | Damaged environments |
| `H` | High (~30%) | Lowest | Extreme conditions, small size |

---

## 📱 QR Code Types

### Website QR Codes

**Format**: `https://example.com`
**Content**: Full URL
**Use Cases**: Marketing, business cards, social media

### Text QR Codes

**Format**: Plain text
**Content**: Any text content
**Use Cases**: Instructions, messages, notes

### Contact QR Codes (vCard)

**Format**: vCard format
**Content**: Contact information
**Example**:
```
BEGIN:VCARD
VERSION:3.0
FN:John Doe
ORG:Company Name
TEL:+1234567890
EMAIL:john@example.com
URL:https://example.com
END:VCARD
```

### WiFi QR Codes

**Format**: WiFi configuration
**Content**: Network credentials
**Example**:
```
WIFI:T:WPA;S:NetworkName;P:password;H:false;;
```

### Email QR Codes

**Format**: `mailto:` format
**Content**: Email address
**Example**: `mailto:contact@example.com`

### Phone QR Codes

**Format**: `tel:` format
**Content**: Phone number
**Example**: `tel:+1234567890`

### SMS QR Codes

**Format**: `sms:` format
**Content**: Phone number and message
**Example**: `sms:+1234567890:Hello, this is a test message`

---

## 🚨 Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "error": "Validation Error",
  "message": "Invalid QR code content",
  "details": {
    "field": "content",
    "issue": "Content exceeds maximum length"
  }
}
```

#### 401 Unauthorized
```json
{
  "error": "Authentication Required",
  "message": "Valid authentication token required"
}
```

#### 404 Not Found
```json
{
  "error": "Resource Not Found",
  "message": "QR code with ID '64f8a1b2c3d4e5f6a7b8c9d0' not found"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "requestId": "req_123456789"
}
```

---

## 📊 Rate Limiting

### Current Limits

- **Generate QR Code**: 100 requests per hour per user
- **Save QR Code**: 50 requests per hour per user
- **Download Tracking**: 200 requests per hour per user

### Rate Limit Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

### Rate Limit Exceeded Response

```json
{
  "error": "Rate Limit Exceeded",
  "message": "Too many requests. Please try again later.",
  "retryAfter": 3600
}
```

---

## 🔍 Request/Response Examples

### Complete QR Code Creation Flow

#### 1. Generate QR Code
```bash
curl -X POST https://api.example.com/api/qr/generate \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "https://example.com",
    "settings": {
      "size": 256,
      "color": "#000000",
      "backgroundColor": "#ffffff",
      "errorCorrection": "M"
    }
  }'
```

#### 2. Save QR Code
```bash
curl -X POST https://api.example.com/api/qr/save \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Website QR",
    "type": "WEBSITE",
    "content": "https://example.com",
    "qrCodeData": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "settings": {
      "size": 256,
      "color": "#000000",
      "backgroundColor": "#ffffff",
      "errorCorrection": "M"
    }
  }'
```

#### 3. Track Download
```bash
curl -X POST https://api.example.com/api/qr/64f8a1b2c3d4e5f6a7b8c9d0/download \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "fileFormat": "PNG"
  }'
```

---

## 🧪 Testing the API

### Using cURL

```bash
# Get all QR codes
curl -H "Authorization: Bearer <token>" \
  https://api.example.com/api/qr

# Generate QR code
curl -X POST https://api.example.com/api/qr/generate \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"content": "Hello World", "settings": {"size": 256}}'
```

### Using JavaScript/Fetch

```javascript
// Get all QR codes
const response = await fetch('/api/qr', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();

// Generate QR code
const qrResponse = await fetch('/api/qr/generate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content: 'https://example.com',
    settings: {
      size: 256,
      color: '#000000',
      backgroundColor: '#ffffff',
      errorCorrection: 'M'
    }
  })
});
```

### Using Postman

1. **Set Authorization**: Bearer Token
2. **Set Headers**: Content-Type: application/json
3. **Set Body**: Raw JSON for POST requests
4. **Test Endpoints**: Use the provided examples

---

## 📈 Analytics and Tracking

### Scan Tracking

Scans are automatically tracked when QR codes are accessed through the application's scan endpoint.

### Download Tracking

Downloads are tracked when users download QR codes through the application interface.

### Analytics Data

- **Total QR Codes**: Count of all user's QR codes
- **Total Downloads**: Sum of all download events
- **Total Scans**: Sum of all scan events
- **This Month**: Activity in the current month

---

*This API documentation is maintained alongside the codebase. For the most up-to-date information, refer to the actual API route files.*
