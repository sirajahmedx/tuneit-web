# TuneIt Web

Next.js frontend for the TuneIt platform.

## Overview

Browser UI for onboarding, authentication, dashboards, and booking flows.

## Tech Stack

Next.js  
NextAuth  
Apollo Client  
Radix UI  
Tailwind CSS

## File Structure

app/layout.tsx  
  Root layout (theme provider, Apollo client bootstrap)

page.tsx  
  Public landing page

app/(auth)/*  
  Auth routes (signin, signup, OTP)

app/(dashboard)/*  
  Protected routes for user and mechanic dashboards

components/*  
  Shared UI (headers, hero, carousels, auth forms)

lib/apollo.js  
  Apollo Client config

lib/token.ts  
  Token utilities

## Core Responsibilities

NextAuth credential flow  
Public landing pages  
Protected dashboards  
GraphQL read/write via Apollo Client

## Local Development

npm install  
npm run dev
