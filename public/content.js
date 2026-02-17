const p1 = [
    "What is it like to set your classroom to a beat? Standing in front of Cobb, you could already feel the 134-year-old Gothic stone seemed to shake off its stillness. Friday, February 6 marked the second Battle of DJs, hosted by the Major Activities Board (MAB) at Cobb Café, the student-run coffee shop in the basement of Cobb Lecture Hall. This year, Cobb welcomed five student DJs – Anton, Kofi, Lucas, Nathan, and Tumi – who turned the historic space into a full-blown rave that pulsed late into the night."
];

const s1 = [
    "<p><i>Heat, heat, heat</i>. In the basement, the air was thick with bass and movement. Winter coats piled up in corners and spilled over the DVD collection near the wall.</p><br/><p>What is usually a quiet study spot, filled with staff-curated playlists, was overtaken by live sound, bringing Cobb Café’s music identity fully into light.</p>",
    "Students squeezed into a tight pit in front of the booth – back to back, shoulder to shoulder – with the crowd nearly doubled from last year. Neon lights cut through the darkness, briefly illuminating graffiti etched into the low ceiling. “FUCK DA POLICE,” it read, flashing into view as the beat rattled the room.",
];


const crowdImages = [
        ["crowd1.jpg", "A crowd gathers in the basement of Cobb Cafe. <a href='https://chicagomaroon.com/staff_name/nolan-shaffer/'>Nolan Shaffer</a>.", -1, 0],
        ["crowd2.jpg", "A party-light setup made the basement coffee shop come alive. <a href='https://chicagomaroon.com/staff_name/nolan-shaffer/'>Nolan Shaffer</a>.", 1, 1],
        ["hallway.jpg", "The hallway of the academic building became the entryway to the party. <a href='https://chicagomaroon.com/staff_name/nolan-shaffer/'>Nolan Shaffer</a>.", 2, 2]
];

export const headline =
    'Basement Beats: <i>Battle of the DJs</i> at Cobb Cafe.';
export const subhead =
    'Five DJs transformed the coffeeshop into a late-night rave hosted by the Major Activities Board.';
export const byline = [
    "Written by <a href='https://chicagomaroon.com/staff_name/polly-wang' style='color: #FE5434;'>Polly Wang</a>.",
    "Developed by <a href='https://chicagomaroon.com/staff_name/nolan-shaffer' style='color: #FE5434;'>Nolan Shaffer</a>.",
]
    
export const sections = [
        {
            scrollText: s1,
            paragraphText: p1,
            imageArray: crowdImages,
            barLength: 0.4,
            start: 0,
        },
    ];