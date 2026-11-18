import { notFound } from "next/navigation"
import { CollectionManager } from "@/components/admin/collection-manager"
import { COLLECTIONS } from "@/lib/admin-config"

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params
  const config = COLLECTIONS[collection]
  if (!config) notFound()
  return <CollectionManager key={config.name} config={config} />
}
