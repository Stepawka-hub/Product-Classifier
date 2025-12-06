import { getErrorMessage } from 'src/utils/error-handler';

export const createCompositeId = (parentId: number, componentId: number) => {
  const buffer = Buffer.from(`${parentId}:${componentId}`);
  return buffer.toString('base64');
};

export const parseCompositeId = (compositeId: string) => {
  const decoded = Buffer.from(compositeId, 'base64').toString();
  const [parentId, componentId] = decoded.split(':').map(Number);

  try {
    if (isNaN(parentId) || isNaN(componentId)) {
      throw new Error('Invalid composite ID format');
    }

    return { parentId, componentId };
  } catch (error) {
    throw new Error(`Failed to parse composite ID: ${getErrorMessage(error)}`);
  }
};
