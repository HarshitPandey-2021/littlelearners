  import { Request, Response, NextFunction } from 'express'
  import jwt from 'jsonwebtoken'

  interface JWTPayload {
    id: string
    role: string
  }

  export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.auth_token
      
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload
      
      // Attach user info to request
      (req as any).user = decoded
      
      next()
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' })
    }
  }