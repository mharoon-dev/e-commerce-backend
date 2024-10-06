import WinDraw from "../models/WinDraw.js";
import User from "../models/User.js";

export const reqWindrw = async (req, res) => {
  try {
    const { userDetails, amount } = req.body;

    if (!userDetails || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newWinDraw = new WinDraw({ userDetails, amount, status: "pending" });
    await newWinDraw.save();

    // update the user rewindraw property
    const findUser = await User.findByIdAndUpdate(
      newWinDraw?.userDetails?._id,
      {
        winDrawReq: true,
      },
      { new: true }
    );
    res.status(200).json(newWinDraw);
  } catch (error) {
    console.log(error);
  }
};

export const updateWindrw = async (req, res) => {
  try {
    const updatedWinDraw = await WinDraw.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    // updayte the bonus of the user
    const findUser = await User.findByIdAndUpdate(
      updatedWinDraw?.userDetails?._id,
      {
        bonus: 0,
        winDrawReq: false,
      },
      { new: true }
    );

    res.status(200).json(updatedWinDraw);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getWinDraw = async (req, res) => {
  try {
    const winDraws = await WinDraw.find();
    res.status(200).json(winDraws);
  } catch (error) {
    res.status(500).json(error);
  }
};
