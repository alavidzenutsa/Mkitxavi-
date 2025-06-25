require('dotenv').config();
const mongoose = require('mongoose');

// mongodb ისთან დაკავშირება
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB-სთან დაკავშირება წარმატებულია! 🌱'))
  .catch(err => console.error('MongoDB-სთან დაკავშირება ვერ მოხერხდა:', err));

// Quiz Schema
const questionSchema = new mongoose.Schema({
  category: String,
  question: String,
  choices: [String],
  answer: Number
});

const Question = mongoose.model('Question', questionSchema);

// სატესტო კითხვები
const questions = [
  // გეოგრაფიის კითხვები
  {
    category: 'geography',
    question: 'რომელია საქართველოს დედაქალაქი?',
    choices: ['ქუთაისი', 'ბათუმი', 'თბილისი', 'რუსთავი'],
    answer: 3
  },
  {
    category: 'geography',
    question: 'რომელია საქართველოს უმაღლესი მწვერვალი?',
    choices: ['უშბა', 'შხარა', 'მყინვარწვერი', 'თეთნულდი'],
    answer: 2
  },
  {
    category: 'geography',
    question: 'რომელ ზღვასთან აქვს საქართველოს სანაპირო?',
    choices: ['შავი ზღვა', 'კასპიის ზღვა', 'ხმელთაშუა ზღვა', 'წითელი ზღვა'],
    answer: 1
  },
  {
    category: 'geography',
    question: 'რომელია საქართველოს უდიდესი ტბა?',
    choices: ['ფარავანი', 'პალიასტომი', 'რიწა', 'ტაბაწყური'],
    answer: 1
  },
  {
    category: 'geography',
    question: 'რომელია საქართველოს უგრძელესი მდინარე?',
    choices: ['რიონი', 'მტკვარი', 'ალაზანი', 'ენგური'],
    answer: 2
  },

  // მუსიკის კითხვები
  {
    category: 'music',
    question: 'რომელი ჯგუფი ასრულებს ლეგენდარულ სიმღერას "Stairway to Heaven"??',
    choices: ['Led Zeppelin', 'Queen', 'Pink Floyd', 'smiths'],
    answer: 1
  },
  {
    category: 'music',
    question: 'რომელი ქართული ხალხური სიმღერაა UNESCO-ს არამატერიალური კულტურული მემკვიდრეობის სიაში?',
    choices: ['მრავალჟამიერი', 'ჩაკრულო', 'სულიკო', 'ურმული'],
    answer: 2
  },
  {
    category: 'music',
    question: 'რომელ ქვეყანაში დაარსდა The Beatles?',
    choices: ['საფრანგეთი', 'გაერთიანებული სამეფო', 'შვედეთი', 'ამერიკა'],
    answer: 2
  },
  {
    category: 'music',
    question: 'რომელია ქართული ხალხური საკრავია?',
    choices: ['ფანდური', 'გიტარა', 'პიანინო', 'აკორდეონი'],
    answer: 1
  },
  {
    category: 'music',
    question: 'რომელ წელს დაარსდა ანსამბლი "სუხიშვილები"?',
    choices: ['1945', '1919', '1935', '1950'],
    answer: 2
  },

  // ისტორიის კითხვები
  {
    category: 'history',
    question: 'რომელ საუკუნეში მოღვაწეობდა მეფე დავით აღმაშენებელი?',
    choices: ['X-XI', 'XI-XII', 'XII-XIII', 'IX-X'],
    answer: 2
  },
  {
    category: 'history',
    question: 'რომელ წელს მიიღო საქართველომ ქრისტიანობა სახელმწიფო რელიგიად?',
    choices: ['337', '326', '317', '347'],
    answer: 1
  },
  {
    category: 'history',
    question: 'ვინ იყო საქართველოს პირველი პრეზიდენტი?',
    choices: ['ედუარდ შევარდნაძე', 'ზვიად გამსახურდია', 'მიხეილ სააკაშვილი', 'გიორგი მარგველაშვილი'],
    answer: 2
  },
  {
    category: 'history',
    question: 'რომელ საუკუნეში დაიწერა "ვეფხისტყაოსანი"?',
    choices: ['XI', 'XII', 'XIII', 'X'],
    answer: 2
  },
  {
    category: 'history',
    question: 'რომელ წელს გახდა თბილისი საქართველოს დედაქალაქი?',
    choices: ['458', '479', '469', '466'],
    answer: 1
  },

  // კოდის კითხვები
  {
    category: 'code',
    question: 'რომელი ენა გამოიყენება ვებ-გვერდის სტრუქტურისთვის?',
    choices: ['CSS', 'HTML', 'Python', 'SQL'],
    answer: 2
  },
  {
    category: 'code',
    question: 'რომელი ენა გამოიყენება სტილისთვის ვებ-გვერდზე?',
    choices: ['HTML', 'JavaScript', 'CSS', 'PHP'],
    answer: 3
  },
  {
    category: 'code',
    question: 'რომელი ენა გამოიყენება ვებ-გვერდზე დინამიკისთვის?',
    choices: ['JavaScript', 'HTML', 'C++', 'Ruby'],
    answer: 1
  },
  {
    category: 'code',
    question: 'რომელია ცვლადის სწორი გამოცხადება JavaScript-ში?',
    choices: ['var x = 5;', 'int x = 5;', 'let x == 5;', 'x := 5;'],
    answer: 1
  },
  {
    category: 'code',
    question: 'რომელი სიმბოლო გამოიყენება კომენტარისთვის JavaScript-ში?',
    choices: ['#', '//', '<!-- -->', '/* */'],
    answer: 2
  },

  // ფიზიკის კითხვები
  {
    category: 'physics',
    question: 'რომელია ნიუტონის პირველი კანონი?',
    choices: ['ძალის კანონი', 'ინერციის კანონი', 'ქმედება-წინააღმდეგობის კანონი', 'ენერგიის შენახვის კანონი'],
    answer: 2
  },
  {
    category: 'physics',
    question: 'რომელია სინათლის სიჩქარე ვაკუუმში?',
    choices: ['300,000 კმ/ს', '150,000 კმ/ს', '3,000 კმ/ს', '30,000 კმ/ს'],
    answer: 1
  },
  {
    category: 'physics',
    question: 'რომელი ერთეულია ძალის?',
    choices: ['ნიუტონი', 'ჯოული', 'ვატი', 'პასკალი'],
    answer: 1
  },
  {
    category: 'physics',
    question: 'რომელია დედამიწის მიზიდულობის აჩქარება?',
    choices: ['9.8 მ/წმ²', '10 მ/წმ²', '8.9 მ/წმ²', '12 მ/წმ²'],
    answer: 1
  },
  {
    category: 'physics',
    question: 'რომელი ფიზიკოსი შექმნა ფარდობითობის თეორია?',
    choices: ['ნიუტონი', 'გალილეი', 'აინშტაინი', 'ფარადეი'],
    answer: 3
  },

  // ზოგადი ცოდნის კითხვები
  {
    category: 'general',
    question: 'რომელია მსოფლიოს უდიდესი ოკეანე?',
    choices: ['ატლანტის ოკეანე', 'წყნარი ოკეანე', 'ინდოეთის ოკეანე', 'ჩრდილოეთის ყინულოვანი ოკეანე'],
    answer: 2
  },
  {
    category: 'general',
    question: 'რომელია ადამიანის სხეულის უდიდესი ორგანო?',
    choices: ['გული', 'ტვინი', 'კანი', 'ღვიძლი'],
    answer: 3
  },
  {
    category: 'general',
    question: 'რომელი ქვეყანა გამოიგონა პიცა?',
    choices: ['საფრანგეთი', 'ესპანეთი', 'იტალია', 'გერმანია'],
    answer: 3
  },
  {
    category: 'general',
    question: 'რომელია დედამიწის თანამგზავრი?',
    choices: ['მარსი', 'მთვარე', 'ვენერა', 'იუპიტერი'],
    answer: 2
  },
  {
    category: 'general',
    question: 'რომელია ყველაზე გრძელი მდინარე მსოფლიოში?',
    choices: ['ნილოსი', 'ამაზონი', 'იანძე', 'მეკონგი'],
    answer: 1
  }
];


async function seedDatabase() {
  try {
    
    await Question.deleteMany({});
    console.log('არსებული კითხვები წაიშალა! ');

    
    await Question.insertMany(questions);
    console.log('ახალი კითხვები დაემატა! ');

    
    await mongoose.connection.close();
    console.log('მონაცემთა ბაზასთან კავშირი დასრულდა! ');
  } catch (error) {
    console.error('შეცდომა მონაცემთა ბაზის შევსებისას:', error);
    process.exit(1);
  }
}


seedDatabase(); 