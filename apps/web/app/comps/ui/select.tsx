"use client";

import * as SelectPrimitive from "@radix-ui/react-select";

export function SelectRoot({
  children,
  ...props
}: SelectPrimitive.SelectProps) {
  return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>;
}

export function SelectTrigger({
  children,
  ...props
}: SelectPrimitive.SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger {...props}>{children}</SelectPrimitive.Trigger>
  );
}

export function SelectValue({
  children,
  ...props
}: SelectPrimitive.SelectValueProps) {
  return <SelectPrimitive.Value {...props}>{children}</SelectPrimitive.Value>;
}

export function SelectIcon({
  children,
  ...props
}: SelectPrimitive.SelectIconProps) {
  return <SelectPrimitive.Icon {...props}>{children}</SelectPrimitive.Icon>;
}

export function SelectPortal({
  children,
  ...props
}: SelectPrimitive.SelectPortalProps) {
  return <SelectPrimitive.Portal {...props}>{children}</SelectPrimitive.Portal>;
}

export function SelectContent({
  children,
  ...props
}: SelectPrimitive.SelectContentProps) {
  return (
    <SelectPrimitive.Content {...props}>{children}</SelectPrimitive.Content>
  );
}

export function SelectViewport({
  children,
  ...props
}: SelectPrimitive.SelectViewportProps) {
  return (
    <SelectPrimitive.Viewport {...props}>{children}</SelectPrimitive.Viewport>
  );
}

export function SelectGroup({
  children,
  ...props
}: SelectPrimitive.SelectGroupProps) {
  return <SelectPrimitive.Group {...props}>{children}</SelectPrimitive.Group>;
}

export function SelectLabel({
  children,
  ...props
}: SelectPrimitive.SelectLabelProps) {
  return <SelectPrimitive.Label {...props}>{children}</SelectPrimitive.Label>;
}

export function SelectItem({
  children,
  ...props
}: SelectPrimitive.SelectItemProps) {
  return <SelectPrimitive.Item {...props}>{children}</SelectPrimitive.Item>;
}

export function SelectItemText({
  children,
  ...props
}: SelectPrimitive.SelectItemTextProps) {
  return (
    <SelectPrimitive.ItemText {...props}>{children}</SelectPrimitive.ItemText>
  );
}

export function SelectItemIndicator({
  children,
  ...props
}: SelectPrimitive.SelectItemIndicatorProps) {
  return (
    <SelectPrimitive.ItemIndicator {...props}>
      {children}
    </SelectPrimitive.ItemIndicator>
  );
}

export function SelectSeparator(props: SelectPrimitive.SelectSeparatorProps) {
  return <SelectPrimitive.Separator {...props} />;
}

export function SelectScrollUpButton({
  children,
  ...props
}: SelectPrimitive.SelectScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpButton {...props}>
      {children}
    </SelectPrimitive.ScrollUpButton>
  );
}

export function SelectScrollDownButton({
  children,
  ...props
}: SelectPrimitive.SelectScrollDownButtonProps) {
  return (
    <SelectPrimitive.ScrollDownButton {...props}>
      {children}
    </SelectPrimitive.ScrollDownButton>
  );
}

export function SelectArrow({
  children,
  ...props
}: SelectPrimitive.SelectArrowProps) {
  return <SelectPrimitive.Arrow {...props}>{children}</SelectPrimitive.Arrow>;
}
