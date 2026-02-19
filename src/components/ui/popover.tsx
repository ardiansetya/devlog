"use client";

import * as React from "react";
import * as PopoverPrimitive from "radix-ui";

import { cn } from "@/lib/utils";

function Popover({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Popover.Root>) {
	return <PopoverPrimitive.Popover.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Popover.Trigger>) {
	return (
		<PopoverPrimitive.Popover.Trigger data-slot="popover-trigger" {...props} />
	);
}

function PopoverContent({
	className,
	align = "center",
	sideOffset = 4,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Popover.Content>) {
	return (
		<PopoverPrimitive.Portal.Root>
			<PopoverPrimitive.Popover.Content
				align={align}
				className={cn(
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=closed]:animate-out data-[state=open]:animate-in",
					className,
				)}
				data-slot="popover-content"
				sideOffset={sideOffset}
				{...props}
			/>
		</PopoverPrimitive.Portal.Root>
	);
}

function PopoverAnchor({
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Popover.Anchor>) {
	return (
		<PopoverPrimitive.Popover.Anchor data-slot="popover-anchor" {...props} />
	);
}

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
