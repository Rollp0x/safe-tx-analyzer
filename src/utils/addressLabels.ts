interface AddressLabels {
  [address: string]: string;
}

let labelsCache: AddressLabels | null = null;

export async function getAddressLabels(): Promise<AddressLabels> {
  if (labelsCache) {
    return labelsCache;
  }

  try {
    const response = await fetch('./data/address_labels.json');
    if (!response.ok) {
      throw new Error('Failed to fetch address labels');
    }
    labelsCache = await response.json();
    return labelsCache as AddressLabels;
  } catch (err) {
    console.error('Error loading address labels:', err);
    return {};
  }
}

// 可选：添加一个同步获取的方法
export function getCachedLabels(): AddressLabels {
  return labelsCache || {};
} 