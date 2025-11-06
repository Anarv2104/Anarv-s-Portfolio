import { Column, Heading, Meta, Schema, SmartLink, Text, Flex } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

// Force static generation for maximum performance
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Projects />
      <Flex 
        fillWidth 
        paddingX="l" 
        marginTop="xl"
        style={{ justifyContent: "center" }}
      >
        <SmartLink
          prefixIcon="document"
          suffixIcon="arrowRight"
          style={{ 
            padding: "12px 24px",
            borderRadius: "24px",
            width: "fit-content",
            border: "1px solid var(--brand-alpha-medium)",
            backgroundColor: "var(--brand-alpha-weak)",
            backdropFilter: "blur(var(--static-space-1))"
          }}
          href="https://github.com/Anarv2104"
        >
          <Text variant="body-default-m">View all Projects</Text>
        </SmartLink>
      </Flex>
    </Column>
  );
}
