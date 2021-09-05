// creating an array and passing the number, questions, options, and answers
let questions = [{
        question: "What class of animal is does a lion belong to?",
        answer: "Mammal",
        options: [
            "Mammal",
            "Bird",
            "Reptile",
            "Amphibian"
        ]
    },
    {
        question: "Which of these is correct?",
        answer: "Amphibians need water to survive",
        options: [
            "Mammals lay eggs",
            "Amphibians need water to survive",
            "Fishes give birth to live babies",
            "Reptiles have fins"
        ]
    },
    {
        question: "Which of these is not a type of vertebrate?",
        answer: "Scopion",
        options: [
            "Frog",
            "Scopion",
            "Snake",
            "Shark"
        ]
    },
    {
        question: "Which of these is not true about birds",
        answer: "All birds can fly",
        options: [
            "All birds have feathers",
            "All birds have wings",
            "All birds lay eggs",
            "All birds can fly"
        ]
    },
    {
        question: "Which of these is not an insect",
        answer: "Snail",
        options: [
            "Mosquito",
            "Ant",
            "Snail",
            "Spider"
        ]
    },
    {
        question: "Which of class of animal does humans belong to?",
        answer: "Mammal",
        options: [
            "Mammal",
            "Birds",
            "Reptile",
            "Fish"
        ]
    },
    {
        question: "Which of these animals is a wild animal",
        answer: "Elephant",
        options: [
            "Dog",
            "Cat",
            "Chicken",
            "Elephant"
        ]
    },
    {
        question: "What is a carnivore?",
        answer: "Animals that eat only meat",
        options: [
            "Animals that eat only vegitables",
            "Animals that eat both plants and meat",
            "Animals that eat only meat",
            "Animals that eat only plants"
        ]
    },
    {
        question: "Which of these is a carnivore?",
        answer: "Tiger",
        options: [
            "Monkey",
            "Elephant",
            "Tiger",
            "Frog"
        ]
    },
    {
        question: "Which of these is false about Fishes?",
        answer: "They breathe through their lungs",
        options: [
            "They live in water",
            "They breathe through their lungs",
            "They breathe through their gills",
            "They have fins"
        ]
    },
    {
        question: "Which of these is not a Reptile",
        answer: "Rat",
        options: [
            "Snake",
            "Crocodile",
            "Rat",
            "Lizard"
        ]
    },
    {
        question: "Amphibians breathe through their?",
        answer: "Skin",
        options: [
            "Lungs",
            "Skin",
            "Gills",
            "Nose"
        ]
    },
    {
        question: "Which of these animals have an aquatic habitat?",
        answer: "Shark",
        options: [
            "Snake",
            "Shark",
            "Rat",
            "Bat"
        ]
    },
    {
        question: "What class of animal is a Rat?",
        answer: "Mammal",
        options: [
            "Reptile",
            "Amphibian",
            "Mammal",
            "Bird"
        ]
    },
    {
        question: "What are endangered animals?",
        answer: "Animals that are in danger of extinction",
        options: [
            "Animals that are in danger of extinction",
            "Animals that are large in number",
            "Animals that are dangerous to humans",
            "Wild Animals"
        ]
    },
    {
        question: "What class of animal do spiders belong to?",
        answer: "Invertebrates",
        options: [
            "Fishes",
            "Amphibians",
            "Reptiles",
            "Invertebrates"
        ]
    },
    {
        question: "What are Invertebrates?",
        answer: "Animals that do not have a backbone",
        options: [
            "Animals that have a backbone",
            "Animals that do not have a backbone",
            "Animals that have fins",
            "Animals that have scales"
        ]
    },
    {
        question: "Which of these animals has a scale?",
        answer: "Animals that do not have a backbone",
        options: [
            "Lizard",
            "Bat",
            "Pigeon",
            "Spider"
        ]
    },
    {
        question: "Which of these animals does not have a scale?",
        answer: "Hummingbird",
        options: [
            "Snake",
            "Crocodile",
            "Shark",
            "Hummingbird"
        ]
    },
    {
        question: "Which of these animals is the largest",
        answer: "Elephant",
        options: [
            "Ape",
            "Elephant",
            "Lion",
            "Girafe"
        ]
    },
    // you can uncomment the below codes and make duplicate as more as you want to add question

    //   {
    //   question: "Your Question is Here",
    //   answer: "Correct answer of the question is here",
    //   options: [
    //     "Option 1",
    //     "option 2",
    //     "option 3",
    //     "option 4"
    //   ]
    // },
];
for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = questions[i]
    questions[i] = questions[j]
    questions[j] = temp
}
questions = questions.slice(0, 9)