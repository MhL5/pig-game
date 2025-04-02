import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { codeToHtml } from "shiki";

const components = {
  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    const className =
      "text-blue-500 hover:text-blue-700 dark:text-blue-700 dark:hover:text-blue-500";

    if (href?.startsWith("/"))
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );

    if (href?.startsWith("#"))
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );

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
        className="prose-code:after:content-none rounded-sm bg-gray-200 px-1 py-0.5 text-gray-800"
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
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
