import { SectionModel } from "../../../database/models/Section.js";
import { placeModel } from "../../../database/models/place.model.js";

export const getAllPlaces = async (req, res, next) => {
  try {
    const places = await placeModel.find({});
    res.json(places);
  } catch (error) {
    next(error);
  }
};

export const getPlace = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) return res.json("not found");
    const place = await placeModel.findById(id);
    res.json(place);
  } catch (error) {
    next(error);
  }
};

export const getPlaceByName = async (req, res, next) => {
  try {
    const placeName = req.params.name;
    if (!placeName) return res.json("not found");
    const place = await placeModel.findOne({ name: placeName });
    res.json(place);
  } catch (error) {
    next(error);
  }
};

/*export const getPlaceByName = async (req, res, next) => {
  const placeName = req.params.name;

    try {
        // تحويل الفراغات إلى %20 في عبارة البحث
        const formattedName = placeName.replace(/ /g, '%20');

        // تقسيم الاسم إلى كلمات فردية
        const nameParts = placeName.split(' ');

        // بناء التعبير العادي للبحث عن كلمات الاسم مع الفراغات بينها
        const regexParts = nameParts.map(part => `(?=.*${part})`).join('\\s');

        // تطبيق التعبير العادي في البحث
        const regex = new RegExp(regexParts, 'i');

        // البحث عن المكان باستخدام التعبير العادي
        const place = await Place.findOne({ name: regex });

        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        // إذا تم العثور على المكان، يتم إرجاعه كإجابة
        res.json(place);
    } catch (error) {
        // في حالة وجود خطأ، يتم إرجاع رسالة الخطأ كإجابة
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
*/

export const addPlace = async (req, res, next) => {
  try {
    const { sectionName, name, desc, coordinates } = req.body;
    let section = await SectionModel.findOne({ name: sectionName });
    if (!section) {
      return res.json({ message: "section is not existed befor" });
    }
    const media = req.files.map((file) => file.filename);

    const place = { name, desc, coordinates, media };
    const result = await placeModel.insertMany(place);
    let update = await SectionModel.updateOne(
      { name: sectionName },
      { $push: { places: result[0]._id } },
      { new: true }
    );
    res.json({ result, update });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
