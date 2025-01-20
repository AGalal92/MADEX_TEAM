/**
 * @param {import('knex')} knex
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('about').del();

  // Inserts seed entries
  await knex('about').insert([
    {
      title: 'About Us',
      img1: '/assets/images/about.jpg',
      par1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      par2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      slug1: 'Our mission is to provide high-quality services and solutions to our clients.',
      slug2: 'We strive to deliver innovative and reliable solutions that meet the needs of our clients.',
      img2: '/assets/images/about-2.jpg',
      link: 'https://www.youtube.com/watch?v=example',
    },
    {
      title: 'About Us',
      img1: '/assets/images/about.jpg',
      par1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      par2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      slug1: 'Our mission is to provide high-quality services and solutions to our clients.',
      slug2: 'We strive to deliver innovative and reliable solutions that meet the needs of our clients.',
      img2: '/assets/images/about-2.jpg',
      link: 'https://www.youtube.com/watch?v=example',
    },
    {
      title: 'About Us',
      img1: '/assets/images/about.jpg',
      par1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      par2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      slug1: 'Our mission is to provide high-quality services and solutions to our clients.',
      slug2: 'We strive to deliver innovative and reliable solutions that meet the needs of our clients.',
      img2: '/assets/images/about-2.jpg',
      link: 'https://www.youtube.com/watch?v=example',
    },
    {
      title: 'About Us',
      img1: '/assets/images/about.jpg',
      par1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      par2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      slug1: 'Our mission is to provide high-quality services and solutions to our clients.',
      slug2: 'We strive to deliver innovative and reliable solutions that meet the needs of our clients.',
      img2: '/assets/images/about-2.jpg',
      link: 'https://www.youtube.com/watch?v=example',
    },
    {
      title: 'About Us',
      img1: '/assets/images/about.jpg',
      par1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      par2: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      slug1: 'Our mission is to provide high-quality services and solutions to our clients.',
      slug2: 'We strive to deliver innovative and reliable solutions that meet the needs of our clients.',
      img2: '/assets/images/about-2.jpg',
      link: 'https://www.youtube.com/watch?v=example',
    },
  ]);
};
