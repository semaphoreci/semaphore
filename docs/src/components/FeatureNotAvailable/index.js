import React from 'react';
import Admonition from '@theme-original/Admonition';

export default function FeatureNotAvailable(props) {
    return <Admonition type="info" title="Not available" {...props} >
            <div>This feature is not in this edition of Semaphore.</div>
           </Admonition>;
}