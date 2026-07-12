/**
 * Deploys firestore.rules to the Firebase project using the Admin SDK
 * (no firebase-tools / interactive login required).
 *
 *   npm run deploy:rules
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { readFileSync } from 'fs'
import { join } from 'path'
import { initializeApp, cert } from 'firebase-admin/app'
import { getSecurityRules } from 'firebase-admin/security-rules'

async function main() {
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin credentials in .env.local')
  }

  const app = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) })
  const rulesSource = readFileSync(join(__dirname, '..', 'firestore.rules'), 'utf8')

  const securityRules = getSecurityRules(app)
  await securityRules.releaseFirestoreRulesetFromSource(rulesSource)

  console.log('Firestore security rules deployed successfully.')
  process.exit(0)
}

main().catch((err) => {
  console.error('Failed to deploy rules:', err)
  process.exit(1)
})
