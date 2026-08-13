"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionIntro from "./SectionIntro";
import type { TeamMember } from "./types";

type TeamSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  members: TeamMember[];
};

const TeamSection = ({
  eyebrow,
  title,
  description,
  members,
}: TeamSectionProps) => (
  <section className="mx-auto mt-20 w-[90%] max-w-7xl sm:mt-28">
    <SectionIntro
      eyebrow={eyebrow}
      title={title}
      description={description}
      align="center"
      className="mx-auto mb-10 max-w-2xl sm:mb-14"
    />

    <div className="mx-auto grid max-w-5xl justify-items-center gap-10 sm:grid-cols-2">
      {members.map((member, index) => (
        <motion.article
          key={member.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: index * 0.1 }}
          className="group w-full overflow-hidden rounded-3xl border border-line bg-surface-raised transition-transform duration-300"
        >
          <div className="relative aspect-5/4.5 overflow-hidden bg-brand-soft">
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 640px) 288px, (max-width: 1024px) 45vw, 288px"
              className="object-cover object-top w-full h-auto transition-transform duration-500 group-hover:scale-[1.035]"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-brand-ink/45 to-transparent" />
            <span className="absolute bottom-3 inset-s-3 rounded-full bg-surface-raised/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-ink backdrop-blur-md">
              {member.role}
            </span>
          </div>
          <div className="p-5">
            <h3 className="type-card-title font-bold text-content-strong">
              {member.name}
            </h3>
            <p className="type-body mt-2.5 text-content-muted">{member.bio}</p>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export default TeamSection;
