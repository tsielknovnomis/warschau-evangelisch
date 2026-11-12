import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ProtectedEmail } from "@/components/ui/ProtectedEmail";
import { obfuscateEmail } from "@/lib/email-obfuscation";

/**
 * Renders a markdown string. External links open safely; internal links use plain anchors.
 * mailto links are rendered spam-protected ("info [klammeraffe] …") — the plain address
 * never reaches the HTML.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => {
          if (href?.startsWith("mailto:")) {
            return <ProtectedEmail obfuscated={obfuscateEmail(href.slice(7))} />;
          }
          const external = href?.startsWith("http");
          return (
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {children}
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
