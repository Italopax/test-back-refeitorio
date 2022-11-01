/* eslint-disable consistent-return */
import { Router, Request, Response } from 'express';
import { Menu } from '../repositories/base/models/MenuModel';
import MenuService from '../services/MenuService';

const routes = Router();
const menuService = new MenuService();


routes.get('/', async (res: Response) => {
    try {

      const menus = await menuService.getAll();

      return res.status(200).json(menus);
    
    } catch (error) {
        return res.status(404).send(error);
      }
});

routes.post('/', async (req: Request, res: Response) => {
    try {
      const { items, date, snack } = req.body;

      if(items == null || date == null || snack == null) throw new Error('Preencha todos os campos obrigatórios!');
  
      const msg = await menuService.addMenu({
        items,
        date,
        snack,
      } as Menu);
      return res.status(201).send(msg);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  routes.put('/:id', async (req: Request, res: Response) => {
    try {
      const { snack, items, date } = req.body;
      const { id } = req.params;
      const menuUpdate = await menuService.updateMenu({ snack, items, date }, Number(id));

      return res.status(200).json(menuUpdate);
  
    } catch (error) {
      res.status(400).json(error.message);
    }
  });
  
  routes.delete('/:id', async ( res: Response) => {
    try {
      
      res.status(200);

    } catch (error) {
      res.status(400).end(error);
    }
  
  });
  
  

export default routes;
