import React from 'react';
import { useEffect } from 'react';
import usePortal from "react-useportal";

import Panel from './Panel';

const PanelPortal = (props) => {
    const { widgetName } = props;
    const { Portal } = usePortal({
        bindTo: document.getElementById('panel-portal'),
      });

    return (
    <Portal>
        <Panel widgetName={widgetName} {...props} />
    </Portal>
    )
};

export default PanelPortal;