export const paths = {
  hero: {
    idle: (i: number) =>
      `sprites/disguised/idle/idle_${i.toString().padStart(5, "0")}.png`,
    prerun: (i: number) =>
      `sprites/disguised/run/prerun/prerun_${i.toString().padStart(5, "0")}.png`,
    run: (i: number) =>
      `sprites/disguised/run/runloop/run_${i.toString().padStart(5, "0")}.png`,
    jump: (i: number) =>
      `sprites/disguised/jump/jump_${i.toString().padStart(5, "0")}.png`,
    fall: (i: number) =>
      `sprites/disguised/fall/fall_${i.toString().padStart(5, "0")}.png`,
  },
  background: [
    "Layer_0011_0",
    "Layer_0010_1",
    "Layer_0009_2",
    "Layer_0008_3",
    "Layer_0007_Lights",
    "Layer_0006_4",
    "Layer_0005_5",
    "Layer_0004_Lights",
    "Layer_0003_6",
    "Layer_0002_7",
    "Layer_0001_8",
    "Layer_0000_9",
  ].map((name) => `sprites/background/${name}.png`),
  enemy: "sprites/enemies/mushroom/mushroom.png",
};
