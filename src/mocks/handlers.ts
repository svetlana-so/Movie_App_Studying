import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('http://localhost:3000/movies.json', () => {
    return HttpResponse.json([
      {
        title: 'John Wick',
        year: 2014,
        cast: [
          'Keanu Reeves',
          'Michael Nyqvist',
          'Alfie Allen',
          'Adrianne Palicki',
          'Bridget Moynahan',
          'Dean Winters',
          'Ian McShane',
          'John Leguizamo',
          'Willem Dafoe',
        ],
        genres: ['Action', 'Thriller'],
        href: 'John_Wick_(film)',
        extract:
          'John Wick is a 2014 American action thriller film directed by Chad Stahelski and written by Derek Kolstad. The film follows John Wick, a legendary hitman who is forced out of retirement to seek revenge against the men who killed his puppy, a final gift from his recently deceased wife. John Wick also stars Michael Nyqvist, Alfie Allen, Adrianne Palicki, Bridget Moynahan, Dean Winters, Ian McShane, John Leguizamo, and Willem Dafoe.',
        thumbnail: 'https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg',
        thumbnail_width: 258,
        thumbnail_height: 387,
      },
    ])
  }),
]
