const db = require(''); //future database
const e = require('exceptions.js');
const ip = require('image-processor.js');
const fr = require('face-recognition');

const recognizer = fr.FaceRecognizer();

const train_model = (json_base64_images, user_id) => {
	var face_training_set = ip.process_images(json_base64_images);
	var face_model = null; 
	
	//const number_of_jitter = 1;
	//recognizer.addFaces(face_training_set, user_id, number_of_jitter);
	
	recognizer.addFaces(face_training_set, user_id);
	face_model = recognizer.serialize();

	return face_model;
};

const save_model = (trained_model) => {
	//save all model in database
};

const load_models = () => {
	//get all models from database.
};

const authenticate_user = (user_base64_image) => {
	const required_accuracy = 0.85;
	var prediction_accuracy = 0;
	var user_id = '';
	var face_prediction = null;
	var face_models = load_models();
	var user_face = ip.process_image(user_base64_image);
	

	for (var i=0; i < face_models.length; i++) {
		recognizer.load(face_models[i]);
		face_prediction = recognizer.predict(user_face);

		user_id = face_prediction[0].className;
		prediction_accuracy = 1 - face_prediction[0].distance;

		if (prediction_accuracy >= required_accuracy)
			return user_id;
	}

	//log that authenticaion failed if such info is logged

	return 'No match found.';
};

module.exports = {
	authenticate_user,
	train_model,
	save_model
}


