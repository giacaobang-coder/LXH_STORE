/**
 * Seeds the Firestore "products" collection with the LXH catalog.
 * Run once after configuring Firebase (see docs/FIREBASE_SETUP.md):
 *
 *   npm run seed
 */
import 'dotenv/config'
import { getAdminDb } from '../src/server/firebase/admin'
import { getMockProducts } from '../src/lib/mock-products'

async function seed() {
  const db = getAdminDb()
  const products = getMockProducts()

  console.log(`Seeding ${products.length} products into Firestore...`)

  const batchSize = 20
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = db.batch()
    const chunk = products.slice(i, i + batchSize)

    for (const product of chunk) {
      const { id, ...data } = product
      batch.set(db.collection('products').doc(id), data)
    }

    await batch.commit()
    console.log(`  ✓ ${Math.min(i + batchSize, products.length)}/${products.length}`)
  }

  console.log('Done. Products are now live in Firestore.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
