import { HTMLMotionProps, MotionProps } from "framer-motion"
import React from "react"

export type MotionComponentProps<T extends keyof HTMLElementTagNameMap> = 
  Omit<HTMLMotionProps<T>, keyof MotionProps> & 
  MotionProps & {
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
    key?: string | number
    ref?: React.Ref<HTMLElementTagNameMap[T]>
  } 