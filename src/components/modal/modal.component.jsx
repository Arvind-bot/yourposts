import { Form } from "carbon-components-react";
import React,{useState} from "react";
import ReactDOM from "react-dom";
import {ComposedModal} from "../composed-modal/composed-modal.component"
import {Button} from "carbon-components-react";
const ModalStateManager = ({
    renderLauncher: LauncherContent,
    children: ModalContent,
  }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        {!ModalContent || typeof document === 'undefined'
          ? null
          : ReactDOM.createPortal(
              <ComposedModal open={open} setOpen={setOpen} />,
            )}
        {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
      </>
    );
  };
  export default ModalStateManager;