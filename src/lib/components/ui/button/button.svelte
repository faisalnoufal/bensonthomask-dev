<!-- <script lang="ts">
	import { Button as ButtonPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";
	import { buttonVariants, type Size, type Variant } from ".";

	type $$Props = ButtonPrimitive.Props & {
		variant?: Variant;
		size?: Size;
	};
	type $$Events = ButtonPrimitive.Events;

	let className: $$Props["class"] = undefined;
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	export let builders: $$Props["builders"] = [];
	export { className as class };
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</ButtonPrimitive.Root> -->

<script lang="ts">
	import { Button as ButtonPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";
	import { buttonVariants, type Size, type Variant } from ".";
  
	type $$Props = ButtonPrimitive.Props & {
	  variant?: Variant;
	  size?: Size;
	};
  
	let className: $$Props["class"] = undefined;
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	export let builders: $$Props["builders"] = [];
	export { className as class };
  </script>
  
  <ButtonPrimitive.Root
	{builders}
	class={cn(
	  "flex",
	  "justify-center",
	  "items-center",
	  "ring-offset-background",
	  "focus-visible:outline-none",
	  "focus-visible:ring-2",
	  "focus-visible:ring-ring",
	  "focus-visible:ring-offset-2",
	  "disabled:pointer-events-none",
	  "disabled:opacity-50",
	  "h-10",
	  "py-2",
	  "px-6",
	  "md:px-8",
	  "inline-block",
	  "rounded-none",
	  "py-auto",
	  "rounded-tl-lg",
	  "rounded-br-lg",
	  "border-2",
	  "border-borderColor",
	  "bg-bgc",
	  "text-sm",
	  "font-medium",
	  "text-borderColor",
	  "hover:bg-borderColor",
	  "hover:text-bgc",
	  "focus:outline-none",
	  "focus:ring",
	  "focus:ring-yellow-400",
	  "hover:scale-105",
	  "active:scale-95",
	  "transition-all",
	  "duration-150",
	  buttonVariants({ variant, size, className })
	)}
	{...$$restProps}
	on:click
	on:keydown
  >
	<slot />
  </ButtonPrimitive.Root>
  