import React, { ComponentProps, ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";

type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const components = {
  h1: (props: ComponentProps<"h1">) => (
    <h1
      className="mt-8 mb-7 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      {...props}
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="mt-8 mb-7 scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="mt-8 mb-7 scroll-m-20 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4
      className="mt-8 mb-7 scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h5: (props: ComponentProps<"h5">) => (
    <h5
      className="mt-8 mb-7 scroll-m-20 text-lg font-semibold tracking-tight"
      {...props}
    />
  ),
  h6: (props: ComponentProps<"h6">) => (
    <h6
      className="mt-8 mb-7 scroll-m-20 text-base font-semibold tracking-tight"
      {...props}
    />
  ),

  p: (props: ParagraphProps) => <p className="leading-snug" {...props} />,

  // lists
  ol: (props: ListProps) => (
    <ol className="list-decimal space-y-2 pl-5" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="list-disc space-y-1 pl-5" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,

  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="inline-block font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      "text-blue-500 hover:text-blue-700 dark:text-blue-700 dark:hover:text-blue-500 underline";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => {
    return (
      <pre
        className={cn(
          "overflow-x-auto rounded-sm bg-[#24292e] p-3 text-base",
          className,
        )}
        {...props}
      />
    );
  },
  code: async ({
    children,
    className,
    ...props
  }: ComponentPropsWithoutRef<"code">) => {
    if (className?.startsWith("language-")) {
      // If it's a code block
      const lang = className.replace("language-", ""); // Extract the language (e.g., ts, js)
      const codeHTML = await codeToHtml(children as string, {
        lang,
        theme: "github-dark",
      });

      return (
        <code
          dangerouslySetInnerHTML={{ __html: codeHTML }}
          {...props}
          className={className}
        />
      );
    }

    return (
      <code
        {...props}
        className="prose-code:after:content-none bg-secondary text-secondary-foreground rounded-sm px-1.5 py-0.5 tracking-wide"
      >
        {typeof children === "string" ? children.replaceAll("`", "") : children}
      </code>
    );
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="border-muted text-muted-foreground ml-[0.075em] border-l-3 pl-4"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
