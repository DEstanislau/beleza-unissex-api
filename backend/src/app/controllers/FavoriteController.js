// import Favorite from '../models/Favorite';
// import User from '../models/User';
// import File from '../models/File';

// class FavoriteController {
//   async index(req, res) {
//     const user_id = req.userId;
//     const provider_id = req.params.providerId;

//     const checkfavorite = await Favorite.findOne({
//       where: {
//         user_id,
//         provider_id,
//       },
//     });

//     if (!checkfavorite) {
//       await Favorite.create({
//         user_id,
//         provider_id,
//         favorited: false,
//       });
//     }

//     const favorites = await Favorite.findOne({
//       where: { user_id, provider_id },
//       include: [
//         {
//           model: User,
//           as: 'provider',
//           attributes: [
//             'id',
//             'shop_name',
//             'name',
//             'email',
//             'tel',
//             'cel',
//             'cep',
//             'address',
//             'house_number',
//             'district',
//             'city',
//             'uf',
//             'rating',
//           ],
//           include: [
//             {
//               model: File,
//               as: 'avatar',
//               attributes: ['id', 'path', 'url'],
//             },
//           ],
//         },
//       ],
//     });

//     return res.json(favorites);
//   }

//   async store(req, res) {
//     const user_id = req.userId;
//     const provider_id = req.params.providerId;

//     const favorite = await Favorite.findOne({
//       where: {
//         user_id,
//         provider_id,
//       },
//     });

//     if (!favorite) {
//       await Favorite.create({
//         user_id,
//         provider_id,
//       });
//     } else if (favorite) {
//       const { favorited } = favorite;

//       favorite.update({
//         favorited: !favorited,
//       });
//     }

//     return res.json(favorite);
//   }
// }
// export default new FavoriteController();
