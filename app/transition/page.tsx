import type { Metadata } from "next";
import CaseStudyStub from "@/components/CaseStudyStub";
import { caseStudies } from "@/lib/site";

const data = caseStudies.find((cs) => cs.slug === "transition")!;

export const metadata: Metadata = {
  title: data.title,
  description: data.summary,
};

export default function TransitionPage() {
  return <CaseStudyStub {...data} />;
}
