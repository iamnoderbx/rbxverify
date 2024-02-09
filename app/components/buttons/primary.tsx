import React from "react";

import { toast } from "react-hot-toast";
import { ToastSylization } from "~/styles/toast.ts";

class PrimaryButton extends React.Component {
    ShowErrorToast() {
        toast.error("You must link a primary account in order to do this!", ToastSylization)
    }

    render() {
        return <button className="btn btn-outline" onClick={this.ShowErrorToast}>Use Primary</button>
    }
}

export default PrimaryButton