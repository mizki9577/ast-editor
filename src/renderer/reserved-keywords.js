// @flow
import React from 'react'

const ReservedKeywordRenderer = ({ keyword }: { keyword: string }) => (
  <span className="keyword ms-fontColor-themePrimary">
    { keyword }
  </span>
)

export const Await = () => <ReservedKeywordRenderer keyword="await" />
export const Break = () => <ReservedKeywordRenderer keyword="break" />
export const Case = () => <ReservedKeywordRenderer keyword="case" />
export const Catch = () => <ReservedKeywordRenderer keyword="catch" />
export const Class = () => <ReservedKeywordRenderer keyword="class" />
export const Const = () => <ReservedKeywordRenderer keyword="const" />
export const Continue = () => <ReservedKeywordRenderer keyword="continue" />
export const Debugger = () => <ReservedKeywordRenderer keyword="debugger" />
export const Default = () => <ReservedKeywordRenderer keyword="default" />
export const Delete = () => <ReservedKeywordRenderer keyword="delete" />
export const Do = () => <ReservedKeywordRenderer keyword="do" />
export const Else = () => <ReservedKeywordRenderer keyword="else" />
export const Export = () => <ReservedKeywordRenderer keyword="export" />
export const Extends = () => <ReservedKeywordRenderer keyword="extends" />
export const Finally = () => <ReservedKeywordRenderer keyword="finally" />
export const For = () => <ReservedKeywordRenderer keyword="for" />
export const Function = () => <ReservedKeywordRenderer keyword="function" />
export const If = () => <ReservedKeywordRenderer keyword="if" />
export const Import = () => <ReservedKeywordRenderer keyword="import" />
export const In = () => <ReservedKeywordRenderer keyword="in" />
export const Instanceof = () => <ReservedKeywordRenderer keyword="instanceof" />
export const New = () => <ReservedKeywordRenderer keyword="new" />
export const Return = () => <ReservedKeywordRenderer keyword="return" />
export const Super = () => <ReservedKeywordRenderer keyword="super" />
export const Switch = () => <ReservedKeywordRenderer keyword="switch" />
export const This = () => <ReservedKeywordRenderer keyword="this" />
export const Throw = () => <ReservedKeywordRenderer keyword="throw" />
export const Try = () => <ReservedKeywordRenderer keyword="try" />
export const Typeof = () => <ReservedKeywordRenderer keyword="typeof" />
export const Var = () => <ReservedKeywordRenderer keyword="var" />
export const Void = () => <ReservedKeywordRenderer keyword="void" />
export const While = () => <ReservedKeywordRenderer keyword="while" />
export const With = () => <ReservedKeywordRenderer keyword="with" />
export const Yield = () => <ReservedKeywordRenderer keyword="yield" />
export const Enum = () => <ReservedKeywordRenderer keyword="enum" />
export const Implements = () => <ReservedKeywordRenderer keyword="implements" />
export const Package = () => <ReservedKeywordRenderer keyword="package" />
export const Protected = () => <ReservedKeywordRenderer keyword="protected" />
export const Interface = () => <ReservedKeywordRenderer keyword="interface" />
export const Private = () => <ReservedKeywordRenderer keyword="private" />
export const Public = () => <ReservedKeywordRenderer keyword="public" />
export const Null = () => <ReservedKeywordRenderer keyword="null" />
export const True = () => <ReservedKeywordRenderer keyword="true" />
export const False = () => <ReservedKeywordRenderer keyword="false" />
export const Let = () => <ReservedKeywordRenderer keyword="let" />
export const Static = () => <ReservedKeywordRenderer keyword="static" />

export const Of = () => <ReservedKeywordRenderer keyword="of" />
export const Async = () => <ReservedKeywordRenderer keyword="async" />
export const From = () => <ReservedKeywordRenderer keyword="from" />
export const As = () => <ReservedKeywordRenderer keyword="as" />

// vim: set ts=2 sw=2 et:
