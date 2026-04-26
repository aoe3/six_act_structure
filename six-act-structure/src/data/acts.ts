export type Field = {
  id: string;
  label: string;
  maxLength: number;
};

export type Act = {
  id: string;
  title: string;
  description: string;
  startTime: string;
  runtime: string;
  fields: Field[];
};

export const acts: Act[] = [
  {
    id: "act1",
    title: "Act One: Dealing with an Imperfect Situation",
    description:
      "In this act, a |Character| in an |Imperfect Situation| faces |Oppressive Opposition| as they pursue an |Initial Goal|. But when there is a |Disturbance| to their routine, they face a |Dilemma| regarding their situation, and must assume a |New Role|.",
    startTime: "Beginning",
    runtime: "20% of the story",
    fields: [
      { id: "act1-character", label: "Character", maxLength: 100 },
      { id: "act1-imperfect-situation", label: "Imperfect Situation", maxLength: 250 },
      { id: "act1-oppressive-opposition", label: "Oppressive Opposition", maxLength: 250 },
      { id: "act1-initial-goal", label: "Initial Goal", maxLength: 250 },
      { id: "act1-disturbance", label: "Disturbance (to Routine)", maxLength: 250 },
      { id: "act1-dilemma", label: "Dilemma", maxLength: 250 },
      { id: "act1-new-role", label: "New Role", maxLength: 250 },
    ],
  },
  {
    id: "act2",
    title: "Act Two: Learning the Rules of an Unfamiliar Situation",
    description:
      "In this act, the character learns the rules of an |Unfamiliar Situation| and faces |Incidental Opposition| in pursuit of a |Transitional Goal|. But when they receive a |Reality Check|, they make a |Commitment| to their New Role.",
    startTime: "20% into the story",
    runtime: "20% of the story",
    fields: [
      { id: "act2-unfamiliar-situation", label: "Unfamiliar Situation (and its rules)", maxLength: 250 },
      { id: "act2-incidental-opposition", label: "Incidental Opposition", maxLength: 250 },
      { id: "act2-transitional-goal", label: "Transitional Goal (that is incidentally opposed)", maxLength: 250 },
      { id: "act2-reality-check", label: "Reality Check", maxLength: 250 },
      { id: "act2-commitment", label: "Commitment (to New Role)", maxLength: 250 },
    ],
  },
  {
    id: "act3",
    title: "Act Three: Stumbling Into the Central Conflict",
    description:
      "In this act, the character stumbles into the |Central Conflict| and faces |Intentional Opposition| in pursuit of a False Goal|. But when there is a grave |Turn of Events|, they have a |Moment of Truth|.",
    startTime: "40% into the story",
    runtime: "20% of the story",
    fields: [
      { id: "act3-central-conflict", label: "Central Conflict", maxLength: 250 },
      { id: "act3-intentional-opposition", label: "Intentional Opposition", maxLength: 250 },
      { id: "act3-false-goal", label: "False Goal (that is intentionally opposed)", maxLength: 250 },
      { id: "act3-grave-turn", label: "(Grave) Turn of Events", maxLength: 250 },
      { id: "act3-moment-of-truth", label: "Moment of Truth", maxLength: 250 },
    ],
  },
  {
    id: "act4",
    title: "Act Four: Implementing a Doomed Plan",
    description:
      "The character implements a |Doomed Plan| and faces |Self-Inflicted Opposition| in pursuit of a |Penultimate Goal|. But when an unthinkable |Lowpoint| occurs, they pull themself together and discover a |Newfound Resolve|.",
    startTime: "60% into the story",
    runtime: "20% of the story",
    fields: [
      { id: "act4-doomed-plan", label: "Doomed Plan", maxLength: 250 },
      { id: "act4-self-inflicted-opposition", label: "Self-Inflicted Opposition", maxLength: 250 },
      { id: "act4-penultimate-goal", label: "Penultimate Goal (that is opposed by the Character themself)", maxLength: 250 },
      { id: "act4-lowpoint", label: "(Unthinkable) Lowpoint", maxLength: 250 },
      { id: "act4-newfound-resolve", label: "Newfound Resolve", maxLength: 250 },
    ],
  },
  {
    id: "act5",
    title: "Act Five: Trying a Long Shot",
    description:
      "The character tries a |Longshot| and faces |Ultimate Opposition| while trying to accomplish the |Ultimate Goal|. But just when it seems |All is Lost|, they make a |Final Push| against the forces of antagonism and either succeed or fail.",
    startTime: "80% into the story",
    runtime: "15% of the story",
    fields: [
      { id: "act5-longshot", label: "Longshot", maxLength: 250 },
      { id: "act5-ultimate-opposition", label: "Ultimate Opposition", maxLength: 250 },
      { id: "act5-ultimate-goal", label: "Ultimate Goal (that is opposed by Ultimate Opposition)", maxLength: 250 },
      { id: "act5-all-is-lost", label: "All is Lost", maxLength: 250 },
      { id: "act5-final-push", label: "Final Push (success OR failure)", maxLength: 250 },
    ],
  },
  {
    id: "act6",
    title: "Act Six: Living in a New Situation",
    description:
      "Having accomplished (or failed to have accomplished) the Ultimate Goal, the character is shown living in a |New Situation|.",
    startTime: "95% into the story",
    runtime: "5% of the story",
    fields: [
      { id: "act6-new-situation", label: "New Situation (after succeeding or failing at the Ultimate Goal)", maxLength: 250 },
    ],
  },
];