import mitt from "mitt"

// type ValidateFunc = () => boolean



// export ValidateFunc

export interface ValidateFunc {
  (): boolean
}

type Events = {
  ['form-item-created']: ValidateFunc;
  bar: number;
};

const emitter = mitt<Events>()

export default emitter

