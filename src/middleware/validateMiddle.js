const validate = (schema) => async (req, res, next) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (err) {
      const status = 455;
      const message ="Fail in the input ";
      const extraDetail = err?.errors?.[0]?.message || "No additional error details provided";
  
      const error={
          status,
          message,
          extraDetail,
      };
      next(error)
      // res.status(400).json({ msg: message });
  
    }
  };
  module.exports = validate;
  