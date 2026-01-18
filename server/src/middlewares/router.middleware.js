export const helloWorldMiddleware = (req, res) => {
  res.status(200).json({ message: "Hello World ", status: "success" });
};

export const apiMiddleware = (req, res) => {
  res.status(200).json({ message: "API Router is Working", status: "success" });
};

export const v1middleware = (req, res) => {
  res.status(200).json({ message: "API v1 is Working ", status: "success" });
};

export const v2middleware = (req, res) => {
  res.status(200).json({ message: "API v2 is Working ", status: "success" });
};
