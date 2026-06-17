# EmailJS Setup Guide for BrixtinStudioX

## Step 1: Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)

## Step 2: Create an Email Service
1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Give it a **Service ID** (e.g., `service_brixtinstudiox`)

## Step 3: Create an Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Project Inquiry from {{from_name}}

Hello {{to_name}},

You have a new project inquiry!

From: {{from_name}}
Email: {{from_email}}
Service Requested: {{service}}
Budget: {{budget}}

Message:
{{message}}

---
Sent from BrixtinStudioX website
```

4. Give it a **Template ID** (e.g., `template_contact`)

## Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

## Step 5: Update the Contact.jsx File
Open `/src/components/Contact.jsx` and update these constants:

```javascript
const EMAILJS_SERVICE_ID = 'service_brixtinstudiox';    // Your Service ID
const EMAILJS_TEMPLATE_ID = 'template_contact';   // Your Template ID  
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // Your Public Key
```

## That's it! 
Your contact form will now send real emails to your inbox.

---

# ScrollReveal Component Usage

Import the component:
```jsx
import ScrollReveal from './components/ScrollReveal';
```

Basic usage:
```jsx
<ScrollReveal direction="up" delay={0.2}>
  <YourComponent />
</ScrollReveal>
```

## Available Props:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| direction | 'up' \| 'down' \| 'left' \| 'right' \| 'none' | 'up' | Animation direction |
| delay | number | 0 | Delay before animation (seconds) |
| duration | number | 0.6 | Animation duration (seconds) |
| threshold | number | 0.1 | How much of element must be visible (0-1) |
| once | boolean | true | Animate only once |
| scale | number | 1 | Starting scale (use 0.9 for scale effect) |
| rotate | number | 0 | Starting rotation in degrees |

## Examples:

Slide from left with delay:
```jsx
<ScrollReveal direction="left" delay={0.3}>
  <Card />
</ScrollReveal>
```

Scale in effect:
```jsx
<ScrollReveal direction="none" scale={0.9}>
  <Image />
</ScrollReveal>
```

Staggered items:
```jsx
{items.map((item, i) => (
  <ScrollReveal key={i} direction="up" delay={i * 0.1}>
    <Item {...item} />
  </ScrollReveal>
))}
```
