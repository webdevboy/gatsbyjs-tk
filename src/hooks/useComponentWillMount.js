import React, { useRef } from 'react';
import { isBrowser } from 'src/utils/auth';

const useComponentWillMount = (func) => {
  if(!isBrowser) return;
  const willMount = useRef(true);

  if (willMount.current) func()

  willMount.current = false;
}

export default useComponentWillMount;
