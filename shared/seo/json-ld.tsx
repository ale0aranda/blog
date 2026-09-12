type JsonValue = string | number | boolean | null | JsonValue[] | JsonObject;

export type JsonObject = {
  [key: string]: JsonValue;
};

interface JsonLdProps {
  data: JsonObject;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script content.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
}
