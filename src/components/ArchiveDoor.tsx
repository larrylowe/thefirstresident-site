"use client";

import { useState, useRef } from "react";
import { ArchiveIntro } from "./ArchiveIntro";
import { ArchiveTimeline } from "./ArchiveTimeline";

/**
 * ArchiveAccess — shown when the user has a valid archive cookie.
 * Controls the intro → timeline reveal flow.
 */
export function ArchiveAccess() {
  const [showTimeline, setShowTimeline] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  function handleEnter() {
    setShowTimeline(true);
    // Small tick so the element renders before we scroll to it
    setTimeout(() => {
      timelineRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }

  return (
    <>
      <ArchiveIntro onEnter={handleEnter} />
      {showTimeline && (
        <div ref={timelineRef}>
          <ArchiveTimeline />
        </div>
      )}
    </>
  );
}
