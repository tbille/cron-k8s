import type { NextApiRequest, NextApiResponse } from 'next'
import {CoreV1Api} from '@kubernetes/client-node'
import type {V1Pod, V1OwnerReference} from '@kubernetes/client-node'
import { kubenetesConfig } from '../../../helpers/k8sConfig'

const coreV1Api = kubenetesConfig.makeApiClient(CoreV1Api)

type Query = {
  filter: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<V1Pod[]>
) {
  const { filter }: Query = req.query as Query
  const allPodsRes = await coreV1Api.listNamespacedPod("cronjobs")

  let pods: V1Pod[] = []
  allPodsRes.body.items.forEach((pod: V1Pod) => {
    pod.metadata?.ownerReferences?.forEach((ownerReference: V1OwnerReference) =>{
      if(ownerReference.kind === "Job") {
        if(filter) {
          if(ownerReference.name == filter) {
            pods.push(pod)
          }
        } else {
          pods.push(pod)
        }
        
      }
    })
  })
  res.status(200).json(pods)
}
