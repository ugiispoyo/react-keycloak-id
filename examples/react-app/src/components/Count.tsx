import React, { useEffect } from 'react'
import { useReactKeycloackId } from 'react-keycloak-id';

const Count = () => {
  const { countDown, onCountDown } = useReactKeycloackId();

  useEffect(() => {
    const interval = setInterval(() => onCountDown("token"), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <span>
        {
          countDown.minutes
        } minutes
        &nbsp;
        {
          countDown.seconds
        } seconds
      </span>
    </div>
  )
}

export default React.memo(Count);