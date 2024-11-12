import { useState } from "react";
import * as automerge from '@automerge/automerge';

import useAuth from "./useAuth";

export const useMerge = () => {
  const baseUri = import.meta.env.VITE_API_ENDPOINT;
  const { getToken } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [mergeErr, setDocumentErr] = useState<any>(null);

  
}