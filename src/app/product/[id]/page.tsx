import React from 'react'

import ClientPage from '@/components/pageMyProfile/ClientPage'

export default function Page({ params }: { params: { id: string } }) {
  return <ClientPage idProducts={params.id} />
}
