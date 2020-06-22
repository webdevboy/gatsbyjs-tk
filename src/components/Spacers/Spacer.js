import React from "react"
import BigSpacer from "./BigSpacer"
import SmallSpacer from "./SmallSpacer"

export default function Spacer(props) {
  return props.spacer === "large" ? <BigSpacer /> : <SmallSpacer />
}
